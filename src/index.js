import "./i18n";

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AdmissionsProvider } from "./context/AdmissionsContext";
import { BillingProvider } from "./context/BillingContext";
import { ExpensesProvider } from "./context/ExpensesContext";
import { PaperworkProvider } from "./context/PaperworkContext";
import { StaffProvider } from "./context/StaffContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StaffProvider>
    <ExpensesProvider>
      <PaperworkProvider>
        <AdmissionsProvider>
          <BillingProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </BillingProvider>
        </AdmissionsProvider>
      </PaperworkProvider>
    </ExpensesProvider>
  </StaffProvider>
);
