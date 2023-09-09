import {
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type Context = {
  effect: boolean;
  setEffect: Dispatch<SetStateAction<boolean>>;
};
const SignInContext = createContext<Context>({} as Context);

export const useSignInEffect = () => useContext<Context>(SignInContext);

type Props = {
  children: ReactNode;
};

export const SignInContextProvider = ({ children }: Props) => {
  const [effect, setEffect] = useState(false);
  return (
    <SignInContext.Provider value={{ effect, setEffect }}>
      {children}
    </SignInContext.Provider>
  );
};
