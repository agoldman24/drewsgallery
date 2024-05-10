import Button from "@material-ui/core/Button";
import { emptyMediums, allMediums, Medium } from "../data/types";
import { defaultTheme } from "../styles";

const buttonStyle = (
  mediums: { [key: string]: boolean },
  currentVal: string
) => {
  const selectedMediums = Object.keys(mediums).filter((m) => mediums[m]);
  let selectedMedium = undefined;
  if (selectedMediums.length == 1) {
    selectedMedium = Object.keys(mediums).filter((m) => mediums[m])[0];
  }
  return {
    border:
      (selectedMediums.length > 1 && currentVal.length == 0) ||
      selectedMedium === currentVal
        ? "1px solid " + defaultTheme.palette.primary.main
        : "1px solid white",
    color:
      (selectedMediums.length > 1 && currentVal.length == 0) ||
      selectedMedium === currentVal
        ? defaultTheme.palette.primary.main
        : "white",
    padding: "3px 10px",
    marginLeft: "5px",
    fontSize: "12px",
    fontFamily: "Signika",
    borderRadius: "50px",
  };
};

export default function Mediums({
  mediums,
  setMediums,
}: {
  mediums: { [key: string]: boolean };
  setMediums: Function;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "35px",
        position: "fixed",
        top: "80px",
        paddingTop: "8px",
        background: "linear-gradient(to right, black, transparent)",
      }}
    >
      <Button
        style={buttonStyle(mediums, Medium.ACRYLIC_PAINT)}
        onClick={() =>
          setMediums({
            ...emptyMediums,
            [Medium.ACRYLIC_PAINT]: true,
          })
        }
      >
        Acrylic
      </Button>
      <Button
        style={buttonStyle(mediums, Medium.COLORED_PENCIL)}
        onClick={() =>
          setMediums({
            ...emptyMediums,
            [Medium.COLORED_PENCIL]: true,
          })
        }
      >
        Pencil
      </Button>
      <Button
        style={buttonStyle(mediums, Medium.WATER_COLOR)}
        onClick={() =>
          setMediums({
            ...emptyMediums,
            [Medium.WATER_COLOR]: true,
          })
        }
      >
        Watercolor
      </Button>
      <Button
        style={buttonStyle(mediums, "")}
        onClick={() => setMediums(allMediums)}
      >
        All
      </Button>
    </div>
  );
}
