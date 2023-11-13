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
      description: "Sample text. Click to select the text box. Click again or double click to start editing the text.",
      buttonText: "Explore",
      icon: <ChatBubbleOutlineOutlinedIcon />,
      route: '/topic'
    },
    {
      title: "使用者",
      description: "Sample text. Click to select the text box. Click again or double click to start editing the text.",
      buttonText: "Explore",
      icon: <PermIdentityOutlinedIcon />,
      route: '/user'
    },
    {
      title: "使用者群體",
      description: "Sample text. Click to select the text box. Click again or double click to start editing the text.",
      buttonText: "Explore",
      icon: <GroupsOutlinedIcon />,
      route: '/user-group'
    }
];

function Cards() {
    console.log('Rendering Cards component');
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
