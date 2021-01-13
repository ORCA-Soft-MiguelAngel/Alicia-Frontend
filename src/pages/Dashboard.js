import React from "react";
import { Container } from "react-bootstrap";
import AccountingHeader from "../components/Accounting/AccountingHeader";
import CompanyViews from "../components/Company/CompanyViews";
import MainLayout from "../components/Layouts/MainLayout";

function Dashboard({ handleRedirect }) {
  return (
    <MainLayout>
      <AccountingHeader
        title="Compañias"
        description="Aqui se muestran todas las companias que tienes registradas"
      />
      <Container fluid>
        <CompanyViews handleRedirect={handleRedirect} />
      </Container>
    </MainLayout>
  );
}

export default Dashboard;
