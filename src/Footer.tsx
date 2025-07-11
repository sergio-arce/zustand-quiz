import { useQuestionData } from "./hooks/useQuestionData"
import { Box, Typography, Paper, Stack, Divider, Button } from "@mui/material"
import { useQuestionStore } from "./store/questions"

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionData()
  const reset = useQuestionStore(state => state.reset)

  const stats = [
    { label: `${correct} correct`, color: "", icon: "✅" },
    { label: `${incorrect} incorrect`, color: "", icon: "❌" },
    { label: `${unanswered} unanswered`, color: "", icon: "❓" },
  ]

  return (
    <Box component="footer">
      <Stack 
        direction="row" 
        spacing={2} 
        justifyContent="center"
        divider={<Divider orientation="vertical" flexItem />}
      >
        {stats.map((stat, idx) => (
          <Paper
            key={idx}
            elevation={2}
            sx={{
              px: 2,
              py: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderRadius: 1,
              bgcolor: '#111',
              color: "common.white",
              minWidth: 120,
              justifyContent: "center",
            }}
          >
            <span>{stat.icon}</span>
            <Typography variant="body2">{stat.label}</Typography>
          </Paper>
        ))}
      </Stack>
      <Button 
        fullWidth 
        variant="outlined" 
        onClick={() => reset()}
        sx={{ mt: 2 }}
      >
        Reset game        
      </Button>
    </Box>
  )
}