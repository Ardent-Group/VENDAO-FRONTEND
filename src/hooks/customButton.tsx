import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from 'framer-motion'
import Fantom from "../assets/images/fantom.svg"
import {
    Box, Button, border
} from "@chakra-ui/react";

interface connectProps {
    headerUsed: boolean
    border_color?: string;
    bg_color?: string;
    hover_color?: string;
}

const AnimatedButton = motion(Button);

export const CustomButton = (props:connectProps) => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted;
                const connected =
                ready &&
                account &&
                chain

                return (
                <Box
                    {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    },
                    })}
                >
                    {(() => {
                    if (!connected) {
                        if(props.headerUsed){
                            return (
                                <Button
                                onClick={openConnectModal}
                                bg="transparent"
                                p="10px 16px"
                                h="40px"
                                border={props.border_color}
                                _hover={{bg: "transparent" }}
                                >
                                    Connect Wallet
                                </Button>
                            )
                        } else {
                            return (
                                <AnimatedButton
                                 bg="#B5FF45"
                                 borderRadius="10px"
                                 h="40px"
                                 p="10px 16px"
                                 _hover={{ bg: "#D9D9D9" }}
                                 _focus={{ bg: "#8AE400" }}
                                 whileHover={{ scale: 0.95 }}
                                 whileTap={{ scale: 0.95 }}
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 20}}
                                 transition={{ duration: 0.6 }}
                                 onClick={openConnectModal}
                                >
                                    Connect Wallet
                                </AnimatedButton>
                            )
                        }
                    }

                    if (chain.unsupported) {
                        return (
                            <Button
                             onClick={openChainModal}
                             bg="red.300"
                             borderRadius="10px"
                             h="40px"
                             p="10px 16px"
                             _hover={{ bg: "red.400"}}
                             _focus={{ bg: "red.400"}}
                            >
                                Wrong network
                            </Button>
                        );
                    }
                    
                    return (
                        <Box
                         bg="transparent"
                         border={props.border_color}
                         _hover={{ bg: "transparent"}}
                         style={{ display: 'flex' }}
                        >
                            <Button
                             onClick={openChainModal}
                             bg={props.bg_color}
                             _hover={{ bg: props.hover_color}}
                             borderRadius={"0px"}
                            >
                                <img
                                 alt="Fantom"
                                 src={Fantom}
                                 style={{ width: 20, height: 20}}
                                />
                            </Button>
                            <Button
                            onClick={openAccountModal}
                            bg="transparent"
                            borderRadius={"0px"}
                            _hover={{ bg: props.hover_color }}
                            style={{ display: 'block'}}
                            >
                                <p>{account.displayBalance}</p>
                                <p>{account.displayName}</p>
                            </Button>
                        </Box>
                    )
                    })()}
                </Box>
                );
            }}
        </ConnectButton.Custom>
    );
}