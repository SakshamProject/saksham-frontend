import { useNavigate } from "react-router-dom";

import { EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer, theme } from "../../styles";

export const generalTypeColumns = [
  {
    Header: "Type Master",
    accessor: "name",
    width: 300,
    sticky: "left",
    Cell: ({ value }) => {
      const navigate = useNavigate();

      return (
        <OptionsContainer>
          {value}
          <EditPopover
            inputValues={[
              {
                label: "Edit",
                customNavigation: () => {
                  navigate(
                    { pathname: ROUTE_PATHS.GENERAL_TYPES_FORM },
                    { state: { viewDetails: false, field: value } }
                  );
                },
              },
              {
                label: "View Details",
                customNavigation: () => {
                  navigate(
                    { pathname: ROUTE_PATHS.GENERAL_TYPES_FORM },
                    { state: { viewDetails: true, field: value } }
                  );
                },
              },
            ]}
          />
        </OptionsContainer>
      );
    },
  },
];

export const typeMasterTypes = [
  "Educational Qualification",
  "Disability Type",
  "Community Category",
  "Service Type",
  "State",
  "District",
];

export const initialValues = (key) => ({
  typeMaster: "Community Category",
  name: "",
  ...(key && { [key]: [] }),
});

export const fields = {
  typeMaster: {
    label: "Type Master",
    name: "typeMaster",
    accessor: "name",
    labelStyle: {
      color: theme.palette?.textColor?.blue,
    },
  },

  name: {
    label: "Enter Type Name",
    name: "name",
  },
};
