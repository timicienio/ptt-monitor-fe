import React from "react";
import  { Box, Typography, Card, CardContent, CardActions, Button, Avatar } from "@mui/material";
import { Inconsolata } from "next/font/google";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Cards from './Cards';

const inconsolata = Inconsolata({
  display: "swap",
  subsets: ['latin']
});

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
  
const descriptionData = [
    {
    title: "功能特色1",
    description: "範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。",
    },
    {
    title: "功能特色2",
    description: "範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。",
    },
    {
    title: "功能特色3",
    description: "範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。範例文字。 按一下以選擇文字方塊。 再次單擊或雙擊開始編輯文字。",
    }
];

export default function HomePage() {
  const cardStyle = {
    position: 'absolute', 
    bottom: '-60px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '300px', 
    bgcolor: 'background.paper',
  };

  return (
    <Box>
        <Box
        sx={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            bgcolor: 'primary.dark',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-start', 
            paddingTop: '20vh',
        }}
        >
            <Box>
                <Typography
                    variant="h1"
                    sx={{ 
                        textDecoration: "none", 
                        fontFamily: inconsolata.style.fontFamily, 
                        fontWeight: "300",
                        width: "100%",
                        textShadow: "-1.5px -1.5px #82CEDD, -1px -1px #82CEDD",
                    }}
                    color="secondary.contrastText"
                    textAlign={"center"}
                >
                ADAPTT
                </Typography>
            </Box>
            <Box>
                <Typography
                    variant="h2"
                    sx={{ 
                        textDecoration: "none", 
                        fontFamily: inconsolata.style.fontFamily,
                        fontWeight: "200",
                        width: "100%",
                        marginTop: "10px",
                    }}
                    color="secondary.contrastText"
                    textAlign={"center"}
                >
                    AI-Driven Analysis for PTT
                </Typography>
                <Typography
                    variant="h3"
                    sx={{ 
                        textDecoration: "none", 
                        fontFamily: inconsolata.style.fontFamily,
                        fontWeight: "100",
                        width: "70%",
                        marginLeft: "15%",
                        marginTop: "20px",
                    }}
                    color="secondary.contrastText"
                    textAlign={"center"}
                >
                    Sample text. Click to select the text box. Click again or double click to start editing the text. Sample text. Click to select the text box. Click again or double click to start editing the text. Sample text.
                </Typography>
            </Box>
            <Box>
                <Cards/>
            </Box>
        </Box>
        <Box
            sx={{
                height: '170vh',
                width: '100%',
                bgcolor: '#82CEDD',
                zIndex: 1,
                paddingTop: '30vh',
            }}
        >
            <Card
                sx={{
                    ml: '10%',
                    mb: '60px',
                    width: '70%',
                    p: 3,
                    boxShadow: 'none',
                }}
            >
                <CardContent>
                    <Typography
                        variant="h2"
                        sx={{
                            mt: '10px',
                            mb: '15px',
                            color: 'info.main',
                        }}
                    >
                        {descriptionData[0].title}
                    </Typography>
                    <Typography>
                        {descriptionData[0].description}
                    </Typography>
                </CardContent>
            </Card>
            <Card
                sx={{
                    ml: '20%',
                    mb: '60px',
                    width: '70%',
                    p: 3,
                    boxShadow: 'none',
                }}
            >
                <CardContent>
                    <Typography
                        variant="h2"
                        sx={{
                            mt: '10px',
                            mb: '15px',
                            color: 'info.main',
                        }}
                    >
                        {descriptionData[1].title}
                    </Typography>
                    <Typography>
                        {descriptionData[1].description}
                    </Typography>
                </CardContent>
            </Card>
            <Card
                sx={{
                    ml: '10%',
                    mb: '60px',
                    width: '70%',
                    p: 3,
                    boxShadow: 'none',
                }}
            >
                <CardContent>
                    <Typography
                        variant="h2"
                        sx={{
                            mt: '10px',
                            mb: '15px',
                            color: 'info.main',
                        }}
                    >
                        {descriptionData[2].title}
                    </Typography>
                    <Typography>
                        {descriptionData[2].description}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    </Box>
  );
}
