import React, { useMemo, useState } from "react";
import "./App.css";
import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function App() {
  const [price, setPrice] = useState<string>("100");
  const [typeValue, setTypeValue] = useState<"con-iva" | "sin-iva">("sin-iva");

  const [taxRate, setTaxRate] = useState("21");

  const precioSinIVA = useMemo(() => {
    if (typeValue === "sin-iva") return price;
    else {
      const sv = (Number(price) * 100) / (100 + Number(taxRate));
      return sv;
    }
  }, [price, taxRate, typeValue]);

  const precioConIVA = useMemo(() => {
    if (typeValue === "con-iva") return price;
    else return Number(price) + (Number(price) * Number(taxRate)) / 100;
  }, [price, taxRate, typeValue]);

  return (
    <Box p={5} maxWidth={300} m="auto">
      <Typography variant="h4" textAlign="center">
        Calcular IVA
      </Typography>
      <Card elevation={3}>
        <Stack p={3} spacing={3}>
          <TextField
            value={price}
            variant="outlined"
            label="PVP"
            onChange={(e) => setPrice(e.target.value)}
          />

          <FormControl>
            <FormLabel>¿Incluye IVA?</FormLabel>
            <RadioGroup
              value={typeValue}
              onChange={(e) => setTypeValue(e.target.value as any)}
            >
              <FormControlLabel
                value="sin-iva"
                label="No (precio bruto)"
                control={<Radio />}
              />
              <FormControlLabel
                value="con-iva"
                label="Sí (precio neto)"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>

          <TextField
            value={taxRate}
            variant="outlined"
            label="IVA"
            onChange={(e) => setTaxRate(e.target.value)}
          />

          <Typography variant="h5" textAlign={"center"}>
            {Number(precioSinIVA).toFixed(2)} + {taxRate}% ={" "}
            {Number(precioConIVA).toFixed(2)}
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}

export default App;
