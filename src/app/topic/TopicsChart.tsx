"use client";

import useTopics from "@/lib/topic/useTopics";
import { Box, Button, Typography } from "@mui/material";
import { CirclePacking } from "@nivo/circle-packing";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

function TopicsChart() {
  const { data } = useTopics();
  const router = useRouter();

  const [zoomedTopicId, setZoomedTopicId] = useState<string | null>(null);

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

  return (
    <Box sx={{ mt: 1 }}>
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
        <Button
          variant="outlined"
          onClick={() => setZoomedTopicId(null)}
          disabled={!zoomedTopicId}
          sx={{
              color: 'info.main',  
              borderColor: 'info.main',
              backgroundColor: 'secondary.contrastText',
              '&:hover': {
                  color: 'info.main',  
                  borderColor: 'info.main',
                  backgroundColor: 'info.light',
              },
              '&:active': {
                  backgroundColor: 'info.light', 
              },
              '&:disabled': {
                  color: 'grey.500',
                  borderColor: 'grey.500',
                  backgroundColor: 'primary.light',
              }
          }}
        >
          返回全部話題
        </Button>

        <Typography variant="h5">
          {zoomedTopicId
            ? `熱門話題: ${
                data?.data.topics.at(Number(zoomedTopicId))?.keywords.at(0)
                  ?.name
              }`
            : "全部話題"}
        </Typography>
        <Button
          onClick={() => router.push(`/topic/${zoomedTopicId}`)}
          disabled={!zoomedTopicId}
          sx={{
              color: 'info.light',  
              borderColor: 'info.main',
              backgroundColor: 'info.main',
              '&:hover': {
                  color: 'info.light',  
                  borderColor: 'info.dark',
                  backgroundColor: 'info.dark',
              },
              '&:active': {
                  backgroundColor: 'info.dark', 
              },
              '&:disabled': {
                  color: 'grey.500',
                  borderColor: 'grey.300',
                  backgroundColor: 'grey.300',
              }
          }}
        >
          話題詳情
        </Button>
      </Box>
    </Box>
  );
}

export default memo(TopicsChart);
