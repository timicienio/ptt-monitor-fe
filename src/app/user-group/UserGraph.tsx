"use client";

import ButtonHollow from "@/components/ButtonHollow";
import ButtonSolid from "@/components/ButtonSolid";
import useUserGraph from "@/lib/userGraph/useUserGraph";
import useTrainRecord from "@/lib/trainRecord/useTrainRecord";
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import dayjs from 'dayjs';
import ScheduleIcon from '@mui/icons-material/Schedule';

import VisGraph, {
  Network,
  GraphData,
  GraphEvents,
  Options,
} from "react-vis-graph-wrapper";

function UserGraph() {
  const router = useRouter();
  const [zoomedTopicId, setZoomedTopicId] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempDate, setTempDate] = useState<string | null>(null);

  const formattedDate = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : undefined;
  const { data } = useUserGraph({ record_date: formattedDate });

  const { data: trainRecord } = useTrainRecord();
  const useTrainRecords = trainRecord?.data;

  useEffect(() => {
    if (useTrainRecords && useTrainRecords.length > 0) {
      const sortedDates = [...useTrainRecords].sort((a, b) => dayjs(b).unix() - dayjs(a).unix());
      setSelectedDate(sortedDates[0]);
    }
  }, [useTrainRecords]);

  const formatDateForButton = (date: string | null): string => {
    return date ? dayjs(date).format("YYYY-MM-DD") : (useTrainRecords && useTrainRecords.length > 0) ? useTrainRecords[0] : '';
  };

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

  const [stoppedSimulation, setStoppedSimulation] = useState(false);
  const [selectedUserGroupId, setSelectedUserGroupId] = useState<number | null>(
    null
  );

  const networkRef = useRef<Network>();

  const userToGroup = useMemo(() => {
    const map = new Map(
      data?.data.user_group.map((entry) => [entry.user_id, entry.group_id])
    );
    return map;
  }, [data?.data.user_group]);

  const edges = useMemo(
    () =>
      data?.data.user_graph
        .filter((edge) => edge.weight > 0.35)
        .map((edge) => ({
          from: edge.user_id_1,
          to: edge.user_id_2,
          value: edge.weight,
        })) ?? [],
    [data?.data.user_graph]
  );

  const userIds = useMemo(() => {
    const set = new Set([
      ...(edges.flatMap((edge) => [edge.from, edge.to]) ?? []),
    ]);
    return Array.from(set);
  }, [data?.data.user_graph]);

  const groupToUser = useMemo(() => {
    const map =
      data?.data.user_group.reduce((acc, cur) => {
        if (userIds.includes(cur.user_id))
          return {
            ...acc,
            [cur.group_id]: [...(acc[cur.group_id] ?? []), cur.user_id],
          };
        else return acc;
      }, {} as Record<number, string[]>) ?? {};
    return map;
  }, [data?.data.user_group, userIds]);

  const nodes = useMemo(
    () =>
      userIds.map((id) => ({
        id,
        label: id,
        group: String(userToGroup.get(id)),
      })),
    [userIds, userToGroup]
  );

  const graph: GraphData = {
    nodes,
    edges,
  };

  const events: GraphEvents = {
    selectNode: ({ nodes }: { nodes: string[] }) => {
      const node = nodes.at(0);
      if (!node) return;
      const groupId = userToGroup.get(node as string) as number;
      const groupNodes = groupToUser[groupId];

      setSelectedUserGroupId(groupId);

      networkRef.current?.setSelection({ nodes: groupNodes });
      networkRef.current?.focus(node, {
        locked: true,
        animation: {
          duration: 100,
          easingFunction: "easeInOutCubic",
        },
      });
    },
    deselectNode: ({ nodes }: { nodes: any[] }) => {
      setSelectedUserGroupId(null);
    },
  };

  const options: Options = {
    nodes: {
      borderWidth: 0,
      borderWidthSelected: 3,
      font: {
        size: 16,
        face: "Tahoma",
      },
      shape: "dot",
      size: 35,
    },
    edges: {
      arrows: {
        to: {
          enabled: false,
        },
      },
      color: {
        inherit: true,
      },
      width: 0.15,
      selectionWidth: 2,
    },

    interaction: {
      // hideEdgesOnDrag: true,
      tooltipDelay: 200,
      dragNodes: false,
      navigationButtons: true,
    },
    physics: {
      stabilization: {
        enabled: true,
        iterations: 10000,
      },
      forceAtlas2Based: {
        centralGravity: 0.04,
        gravitationalConstant: -400,
        springLength: 25,
        springConstant: 0.095,
        damping: 2,
      },
      maxVelocity: 60,
      minVelocity: 10,
      solver: "forceAtlas2Based",
      timestep: 0.3,
    },
    layout: {
      improvedLayout: false,
    },
    // configure: {},
  };

  useEffect(() => {
    networkRef.current?.moveTo({ scale: 0.09 });
  }, [networkRef.current]);

  const handleUserGroupDetails = () => {
    if (selectedUserGroupId) {
      const url = selectedDate 
        ? `/user-group/${selectedUserGroupId}?record_date=${selectedDate}`
        : `/user-group/${selectedUserGroupId}`;
  
      router.push(url);
    }
  };    

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          ml: -5,
          mb: 2,
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          textAlign={"left"}
        >
          使用者群體
        </Typography>
        <Box
          sx={{
            mr: -5,
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
              選擇不同的日期，以查看該時間點下的使用者群體分析結果。
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
          mt: 1,
          height: "550px",
          width: "1050px",
          backgroundColor: "white",
          borderRadius: "15px",
        }}
      >
        <VisGraph
          graph={graph}
          options={options}
          events={events}
          ref={networkRef}
        />
        <Box
          sx={{
            display: "flex",
            mt: 2,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ButtonHollow
            onClick={() => {
              networkRef.current?.stabilize();
              setStoppedSimulation(true);
            }}
            disabled={true}
          >
            停止
          </ButtonHollow>
          <Typography variant="h5">
            {selectedUserGroupId
              ? `使用者群體#${selectedUserGroupId}`
              : "全部使用者群體"}
          </Typography>
          <ButtonHollow
            onClick={handleUserGroupDetails}
            disabled={!selectedUserGroupId}
          >
            使用者群體詳情
          </ButtonHollow>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(UserGraph);
