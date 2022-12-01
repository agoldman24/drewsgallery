import {
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Fragment, SyntheticEvent } from "react";
import { defaultMediums, emptyMediums, Medium } from "../data/types";
import { closeButtonStyle, closeIconStyle } from "../styles";

export default function Filters({
  mediums,
  setMediums,
  closeFilter,
}: {
  mediums: { [key: string]: boolean };
  setMediums: Function;
  closeFilter: (event: SyntheticEvent) => void;
}) {
  const allSelected = Object.values(mediums).filter((m) => !m).length === 0;
  return (
    <Fragment>
      <FormControl component="fieldset">
        <IconButton style={closeButtonStyle} onClick={closeFilter}>
          <Close style={closeIconStyle} />
        </IconButton>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={allSelected}
                onClick={() =>
                  setMediums(allSelected ? emptyMediums : defaultMediums)
                }
              />
            }
            label={"All Mediums"}
          />
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
              />
            }
            label={Medium.OIL_PASTEL}
          />
        </FormGroup>
      </FormControl>
    </Fragment>
  );
}
