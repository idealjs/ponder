import { PropsWithChildren } from "react";

import { BackendBaseUrlContext } from "../store";

interface IProps {
  value: string;
}

const BackendBaseURLProvider = (props: PropsWithChildren<IProps>) => {
  const { children, value } = props;
  return (
    <BackendBaseUrlContext.Provider value={value}>
      {children}
    </BackendBaseUrlContext.Provider>
  );
};

export default BackendBaseURLProvider;
