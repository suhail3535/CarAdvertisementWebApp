import React, { useEffect, useState } from "react";

import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import { Box, Button, Text } from "@chakra-ui/react";
// import "./navbar.css";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 700) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <Box
            onClick={isVisible ? scrollToTop : scrollToBottom}
            position="fixed"
            bottom="30px"
            right={["16px", "84px"]}
            zIndex={3}>
            <Button
                size={"sm"}
                bg={"RGB(77 77 185)"}
                _hover={{

                        background: "linear-gradient(to right, #3399ff, #9933ff, #6600cc)"
                }}
                w={"50px"}
                h={"50px"}
                style={{ borderRadius: "50%" }}
                // border="1px solid red"
            >
                <Text fontSize={"20px"} color={"#167a92"}>
                    {isVisible ? (
                        <AiOutlineArrowUp
                            style={{ fontSize: "30px", color: "white" }}
                        />
                    ) : (
                        <AiOutlineArrowDown
                            style={{ fontSize: "30px", color: "white" }}
                        />
                    )}
                </Text>
            </Button>
        </Box>
    );
}
