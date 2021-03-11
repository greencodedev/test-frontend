import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Text } from "@chakra-ui/react"

const DynamicText = forwardRef((props: any, ref: any) => {
  const [value, setValue] = useState("Random Text");

  useImperativeHandle(
    ref,
    () => ({
      changeValue(newValue: React.SetStateAction<string>) {
        setValue(newValue);
      }
    }),
  )

  

  return <Text wordBreak="break-all" fontSize="3xl">{value}</Text>;
});

export default DynamicText;
