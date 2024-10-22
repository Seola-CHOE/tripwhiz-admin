import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const cryptoOrders: CryptoOrder[] = [

    {
      id: '10',
      orderDetails: 'Wallet Transfer',
      orderDate: subDays(new Date(), 123).getTime(),
      status: 'failed',
      orderID: '17KRZHY8T05M',
      sourceName: 'Wallet Transfer',
      sourceDesc: "John's Cardano Wallet",
      amountCrypto: 765.5695,
      amount: 7567,
      cryptoCurrency: 'ADA',
      currency: '$'
    }
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default RecentOrders;
