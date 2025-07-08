import { ReactNode } from "react";
import { Box } from "@mui/material";

interface TabPanelProps {
  children: ReactNode;
  value: number;
  index: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return value === index ? (
    <Box p={3} sx={{
      maxHeight: 'calc(100vh - 120px)',
      overflow: 'scroll',
      boxSizing: 'border-box'
    }}>
      {children}
    </Box>
  ) : null;
}

export default TabPanel;