import React from "react";
import  { Box, Typography, Card, CardContent } from "@mui/material";
import { Inconsolata } from "next/font/google";

import Cards from './Cards';

const inconsolata = Inconsolata({
  display: "swap",
  subsets: ['latin']
});
  
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
  return (
    <Box>
        <Box
        sx={{
            position: 'relative',
            height: '620px',
            width: '100%',
            bgcolor: 'primary.contrastText',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-start', 
            paddingTop: '110px',
        }}
        >
            <Box sx={{ mb: "40px",}}>
                <Typography
                    variant="h1"
                    sx={{ 
                        textDecoration: "none", 
                        fontFamily: inconsolata.style.fontFamily, 
                        fontWeight: "100",
                        width: "100%",
                        textShadow: "-1.5px -1.5px #82CEDD, -1px -1px #82CEDD",
                    }}
                    color="secondary.contrastText"
                    textAlign={"center"}
                >
                    ADAPTT
                </Typography>
                <Typography
                    variant="h2"
                    sx={{ 
                        textDecoration: "none", 
                        fontFamily: inconsolata.style.fontFamily,
                        fontWeight: "800",
                        width: "100%",
                        marginTop: "10px",
                    }}
                    color="secondary.contrastText"
                    textAlign={"center"}
                >
                    AI-Driven Analysis for PTT
                </Typography>
            </Box>
            <Box>
                <Typography
                    variant="h3"
                    sx={{ 
                        textDecoration: "none", 
                        fontFamily: inconsolata.style.fontFamily,
                        fontWeight: "400",
                        width: "70%",
                        marginLeft: "15%",
                        marginTop: "-10px",
                    }}
                    color="secondary.contrastText"
                    textAlign={"center"}
                >
                    由先進 AI 技術驅動，讓你掌握最新話題趨勢，深入洞察論壇生態，並保護自己免於網路輿論操作的影響。
                </Typography>
            </Box>
            <Box>
                <Cards/>
            </Box>
        </Box>
        <Box
            sx={{
                height: '1100px',
                width: '100%',
                bgcolor: '#82CEDD',
                zIndex: 1,
                paddingTop: '180px',
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
