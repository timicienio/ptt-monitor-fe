import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import useTopicStance from "@/lib/topic/useTopicStance";
import useTopicUsers from "@/lib/user/useTopicUsers";
import {
  Box,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Chart({ topicId }: { topicId: number }) {
  const router = useRouter();

  const { data: TopicStance } = useTopicStance(topicId);
  const { data: TopicUser, setSize } = useTopicUsers(topicId, {
    limit: 50,
  });

  const topicStance = TopicStance?.data.stances ?? [];

  const chartData = (TopicUser || []).flat().map(user => ({
    x: user.stance,
    y: user.post_count + user.comment_count,
    name: user.id,
    post_count: user.post_count,
    comment_count: user.comment_count
  })) ?? [];

  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
        payload: {
            name: string;
            post_count: number;
            comment_count: number;
        };
    }>;
  }

  const CustomDot: React.FC<any> = (props) => {
    const { cx, cy, payload, ...otherProps } = props;
    return (
      <circle cx={cx} cy={cy} r={5} fill="rgba(75, 192, 192, 0.6)" {...otherProps} />
    );
  };  

  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, post_count, comment_count } = payload[0].payload;

        return (
            <Box 
                sx={{ 
                    backgroundColor: 'white', 
                    padding: '5px', 
                    border: '1px solid #ccc' 
                }}
            >
                <Typography 
                    sx={{
                        fontSize: '14px',

                    }}
                >
                    使用者名稱：{name} <br />
                    發文數：{post_count} <br />
                    留言數：{comment_count}
                </Typography>
            </Box>
        );
    }
    return null;
  };

  const handleDotClick = (event: any) => {
    console.log('Dot clicked:', event);
    const name = event?.name;
    if (name) {
        console.log('Redirecting to:', `/user/${name}`);
        router.push(`/user/${name}`);
    } else {
        console.log('Name not found in clicked dot.');
    }
  };


  // Define the positions for the categorical labels
  const tickPositions = [0, 0.5, 1];

  // Define a type for the labels map
  type LabelMap = {
    [key in typeof tickPositions[number]]: string;
  };

  // Map the positions to the desired labels using the type
  const labels: LabelMap = {
    0: topicStance[0]?.name,
    0.5: '中立',
    1: topicStance[1]?.name,
  };

  // Safe function to get label from map
  const getLabel = (value: number): string => {
    return labels[value as keyof typeof labels] || '';
  };

  return (
    <Box
      sx={{
        flexDirection: "column",
        alignContent: "center",
        flex: 1,
        marginTop: '15px'
      }}
    >
      <Box
        sx={{ width: '95%', height: '400px', borderRadius: '16px', overflow: 'hidden' }}
      >
        <ResponsiveContainer>
            <ScatterChart 
                margin={{ top: 35, right: 35, bottom: 30, left: 30 }}
            >
                <CartesianGrid/>
                <XAxis
                    type="number"
                    dataKey="x"
                    domain={[0, 1]}
                    ticks={tickPositions}
                    tickFormatter={getLabel}
                    tick={{ fill: 'primary.dark', fontSize: '14px', transform: 'translate(0, 15)' }}
                    tickLine={false}
                />
                <YAxis 
                    tickLine={false} 
                    label={{
                        value: '活躍度', 
                        position: 'top', 
                        offset: 20, 
                        style: { textAnchor: 'middle', fontSize: '14px' }
                    }} 
                    type="number" 
                    dataKey="y" 
                    tick={{ fill: 'primary.dark', fontSize: '14px', transform: 'translate(-10, 0)' }}
                />
                <Scatter 
                    data={chartData} 
                    shape={<CustomDot />} 
                    isAnimationActive={false} 
                    onClick={handleDotClick}
                />
                <Tooltip 
                    content={<CustomTooltip />} 
                    cursor={{ strokeDasharray: '3 3' }}
                />
            </ScatterChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
