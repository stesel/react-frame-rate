import * as React from "react";
import { createRoot } from "react-dom/client";
import SignInDialog from "./SignInDialog";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("app")!);

root.render(<SignInDialog />);
