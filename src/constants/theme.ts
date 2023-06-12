import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        // overflowX: "hidden", // Prevent horizontal scrollbar due to the modal
      },
    },
  },
});
