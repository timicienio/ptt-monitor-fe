"use client";

import useTopics from "@/lib/topic/useTopics";
import useTrainRecord from "@/lib/trainRecord/useTrainRecord";
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from "@mui/material";
import { CirclePacking } from "@nivo/circle-packing";
import { useRouter, } from "next/navigation";
import React, { memo, useState, useEffect } from "react";
import ButtonSolid from "@/components/ButtonSolid";
import ButtonHollow from "@/components/ButtonHollow";
import dayjs from 'dayjs';
import ScheduleIcon from '@mui/icons-material/Schedule';

function TopicsChart() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempDate, setTempDate] = useState<string | null>(null);

  const { data: trainRecord } = useTrainRecord();
  const useTrainRecords = trainRecord?.data;

  useEffect(() => {
    if (useTrainRecords && useTrainRecords.length > 0) {
      const sortedDates = [...useTrainRecords].sort((a, b) => dayjs(b).unix() - dayjs(a).unix());
      setSelectedDate(sortedDates[0]);
    }
  }, [useTrainRecords]);

  const formattedDate = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : undefined;
  const { data } = useTopics({ record_date: formattedDate });

  const formatDateForButton = (date: string | null): string => {
    return date ? dayjs(date).format("YYYY-MM-DD") : (useTrainRecords && useTrainRecords.length > 0) ? useTrainRecords[0] : '';
  };

  const router = useRouter();
  const [zoomedTopicId, setZoomedTopicId] = useState<string | null>(null);

  const handleOpenDialog = () => {
    setTempDate(selectedDate); 
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    setSelectedDate(tempDate); 
    handleCloseDialog();
  };

  const handleReset = () => {
    setTempDate(null);
  };

  const buttonStyle = {
    width: "130px",
    border: "1px solid #3B8EA5",
    borderRadius: "5px",
    color: "secondary.dark",
    backgroundColor: selectedDate && selectedDate !== dayjs().format("YYYY-MM-DD") ? "#D7F8F9" : "none"
  };
  

  const chartData = {
    id: "root",
    value: 1,
    children:
      data?.data.topics.map((topic) => ({
        id: String(topic.id),
        value: topic.size,
        children: topic.keywords.map((keyword) => ({
          id: `${keyword.name}__${topic.id}`,
          value: keyword.value,
        })),
      })) ?? [],
  };

  const [cleared, setCleared] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          ml: -17,
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          textAlign={"left"}
        >
          熱門話題分類
        </Typography>
        <Box
          sx={{
            mr: -17,
          }}
        >
          <Button 
            onClick={handleOpenDialog}
            sx={buttonStyle}
          >
            <ScheduleIcon 
              sx={{
                mr: "5px",
              }}
            />
            {formatDateForButton(selectedDate)}
          </Button>
        </Box>
        <Dialog 
          open={dialogOpen} 
          onClose={handleCloseDialog}
          PaperProps={{
            sx: {
              marginTop: '-7%',
            }
          }}
        >
          <DialogTitle
            variant="h3"
            sx={{
              mt: "5px",
              textAlign: "center",
            }}
          >
            更改日期
          </DialogTitle>
          <DialogContent>
            <Typography
              sx={{
                mb: "30px",
              }}
            >
              選擇不同的日期，以查看該時間點下的熱門話題分類結果。
            </Typography>
            <Select
              value={tempDate || formatDateForButton(selectedDate)}
              onChange={(e) => setTempDate(e.target.value as string)}
              sx={{ width: "100%" }}
            >
              {useTrainRecords && useTrainRecords.map((date: string, index: number) => (
                <MenuItem key={index} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",       
              justifyContent: "space-between",
              mb: "5px",
              mr: "17px",
              ml: "17px",
            }}
          >
            <ButtonSolid onClick={handleReset}>重置</ButtonSolid>
            <ButtonHollow onClick={handleConfirm}>確認</ButtonHollow>
          </DialogActions>
        </Dialog>
      </Box>
      <Box 
        sx={{ 
          mt: 2 
        }}
      >
        <CirclePacking
          isInteractive
          label={(d) => d.data?.id.split("__").at(0) ?? ""}
          labelsSkipRadius={13}
          enableLabels
          colors={{ scheme: "greys" }}
          data={chartData}
          height={550}
          width={850}
          borderWidth={1}
          labelsFilter={(label) => label.node.depth === 2}
          onClick={(node) => {
            if (node.depth === 0) {
              setZoomedTopicId(null);
            } else if (node.depth === 1) {
              setZoomedTopicId(node.data.id);
            } else if (node.depth === 2) {
              setZoomedTopicId(String(node.path.at(1)));
            }
          }}
          zoomedId={zoomedTopicId}
          motionConfig="default"
        />
        <Box
          sx={{
            display: "flex",
            mt: 2,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ButtonSolid
            onClick={() => setZoomedTopicId(null)}
            disabled={!zoomedTopicId}
          >
            返回全部話題
          </ButtonSolid>
          <Typography variant="h5">
            {zoomedTopicId
              ? `熱門話題: ${
                  data?.data.topics.at(Number(zoomedTopicId))?.keywords.at(0)
                    ?.name
                }, ${
                  data?.data.topics.at(Number(zoomedTopicId))?.keywords.at(1)
                    ?.name
                }`
              : "全部話題"}
          </Typography>
          <ButtonHollow
            onClick={() => router.push(`/topic/${zoomedTopicId}`)}
            disabled={!zoomedTopicId}
          >
            話題詳情
          </ButtonHollow>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(TopicsChart);
