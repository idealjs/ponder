import { createContext, PropsWithChildren, useContext } from "react";

interface IProps {
  value: string;
}

export const BackendBaseUrlContext = createContext<string | undefined>(
  undefined
);

const BackendBaseURLProvider = (props: PropsWithChildren<IProps>) => {
  const { children, value } = props;
  return (
    <BackendBaseUrlContext.Provider value={value}>
      {children}
    </BackendBaseUrlContext.Provider>
  );
};

export default BackendBaseURLProvider;

export const useBackendBaseURL = () => {
  return useContext(BackendBaseUrlContext);
};
