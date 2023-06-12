import { Container as ContainerBox } from "@chakra-ui/react";

export default function ContainerWrapper({ children, ...props }: any) {
  return (
    <ContainerBox
      pos="relative"
      maxW={[
        // "container.md",
        // "container.lg",
        // "container.lg",
        // "container.lg",
        // "container.xl",
        "container.xl",
      ]}
      // px="5%"
      {...props}
    >
      {children}
    </ContainerBox>
  );
}
