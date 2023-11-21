"use client";

import React from "react";
import { memo } from "react";
import { useRouter } from "next/navigation";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import  { Box, Typography, Card, CardContent, CardActions, Button, Avatar } from "@mui/material";

const cardData = [
    {
      title: "熱門話題",
      description: "瞭解人們在談論什麼，他們所擁護的立場，以及誰正在引領這場討論。",
      buttonText: "Explore",
      icon: <ChatBubbleOutlineOutlinedIcon />,
      route: '/topic'
    },
    {
      title: "使用者分析",
      description: "查看個別用戶的動態，他們對話題的觀點傾向，以及他們與誰站在同一陣線。",
      buttonText: "Explore",
      icon: <PermIdentityOutlinedIcon />,
      route: '/user'
    },
    {
      title: "使用者群體分析",
      description: "視覺化使用者關係網絡，識別具有相似活動和立場模式的使用者群體，並瞭解這些群體的特性。",
      buttonText: "Explore",
      icon: <GroupsOutlinedIcon />,
      route: '/user-group'
    }
];

function Cards() {
    const router = useRouter();

    return (
        <Box 
            sx={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                paddingBottom: '-10px', 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '70px', 
            }}
        >
            {cardData.map((card, index) => (
                <Card 
                    elevation={0}
                    key={index} 
                    sx={{ 
                        height: '350px',
                        width: '300px', 
                        mb: '-70px', 
                        zIndex: 2,
                        borderRadius: '20px'
                    }}
                >
                    <CardContent>
                        <Avatar 
                            sx={{ 
                                bgcolor: 'info.main', 
                                margin: 'auto',
                                width: '70px', 
                                height: '70px',
                                mt: '15px',
                            }}
                        >
                            {React.cloneElement(card.icon, { sx: { fontSize: '30px' } })}
                        </Avatar>
                        <Typography 
                            variant='h3'
                            sx={{ 
                                mt: '25px',
                                textAlign: 'center',
                            }}
                        >
                            {card.title}
                        </Typography>
                        <Typography 
                            sx={{ 
                                mt: '25px',
                                px: '20px',
                                textAlign: 'center',
                            }}
                        >
                            {card.description}
                        </Typography>
                    </CardContent>
                    <CardActions 
                        sx={{ 
                            justifyContent: 'center' 
                        }}
                    >
                        <Button
                            onClick={() => router.push(card.route)}
                            sx={{
                                boxShadow: 'none',
                                textTransform: 'none', 
                                backgroundColor: 'transparent', 
                                color: 'info.main',
                                fontSize: 20,
                                fontWeight: 700,
                                mt: '10px',
                                '&:hover': {
                                    backgroundColor: 'info.light', 
                                    boxShadow: 'none', 
                                },
                            }}
                            >
                            {card.buttonText}
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
}

export default memo(Cards);
