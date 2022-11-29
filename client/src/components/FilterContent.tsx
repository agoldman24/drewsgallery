import {
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Fragment, SyntheticEvent } from "react";
import { Medium } from "../data/types";

export default function FilterModal({
  mediums,
  setMediums,
  closeFilter,
}: {
  mediums: { [key: string]: boolean };
  setMediums: Function;
  closeFilter: (event: SyntheticEvent) => void;
}) {
  return (
    <Fragment>
      <IconButton
        style={{ position: "fixed", top: "0", right: "0" }}
        onClick={closeFilter}
      >
        <Close style={{ width: "32px", height: "32px" }} />
      </IconButton>
      <FormControl component="fieldset">
        <FormLabel component="legend">Mediums</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={mediums[Medium.COLORED_PENCIL]}
                onClick={() =>
                  setMediums({
                    ...mediums,
                    [Medium.COLORED_PENCIL]: !mediums[Medium.COLORED_PENCIL],
                  })
                }
                name={Medium.COLORED_PENCIL}
              />
            }
            label={Medium.COLORED_PENCIL}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={mediums[Medium.ACRYLIC_PAINT]}
                onClick={() =>
                  setMediums({
                    ...mediums,
                    [Medium.ACRYLIC_PAINT]: !mediums[Medium.ACRYLIC_PAINT],
                  })
                }
                name={Medium.ACRYLIC_PAINT}
              />
            }
            label={Medium.ACRYLIC_PAINT}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={mediums[Medium.WATER_COLOR]}
                onClick={() =>
                  setMediums({
                    ...mediums,
                    [Medium.WATER_COLOR]: !mediums[Medium.WATER_COLOR],
                  })
                }
                name={Medium.WATER_COLOR}
              />
            }
            label={Medium.WATER_COLOR}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={mediums[Medium.INK]}
                onClick={() =>
                  setMediums({
                    ...mediums,
                    [Medium.INK]: !mediums[Medium.INK],
                  })
                }
                name={Medium.INK}
              />
            }
            label={Medium.INK}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={mediums[Medium.CHARCOAL]}
                onClick={() =>
                  setMediums({
                    ...mediums,
                    [Medium.CHARCOAL]: !mediums[Medium.CHARCOAL],
                  })
                }
                name={Medium.CHARCOAL}
              />
            }
            label={Medium.CHARCOAL}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={mediums[Medium.OIL_PASTEL]}
                onClick={() =>
                  setMediums({
                    ...mediums,
                    [Medium.OIL_PASTEL]: !mediums[Medium.OIL_PASTEL],
                  })
                }
                name={Medium.OIL_PASTEL}
              />
            }
            label={Medium.OIL_PASTEL}
          />
        </FormGroup>
      </FormControl>
    </Fragment>
  );
}
