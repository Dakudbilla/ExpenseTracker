import BalanceComponent from "../components/BalanceComponent";
import IncomeExpenses from "../components/IncomeExpenses";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container">
        <BalanceComponent />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </>
  );
};

export default Home;
