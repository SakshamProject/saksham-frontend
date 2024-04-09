import { useNavigate } from "react-router-dom";

import { EditPopover } from "../../components/shared";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { OptionsContainer } from "../../styles";

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
