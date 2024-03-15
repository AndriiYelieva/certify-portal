import { useParams } from 'react-router-dom';
import './home.scss'
import { InfoCard } from '../../components/InfoCard/InfoCard';

const testArray = [
  {
    id: 1,
    name: "Єлєва Алла Олександрівна",
    "Issuer CN": "monobank",
    validFrom: 2023 - 11 - 13,
    validTo: 2024 - 11 - 13,
  },
  {
    id: 2,
    name: "Єлєва Аліса Дмитрівна",
    "Issuer CN": "privatbank",
    validFrom: 2023 - 11 - 13,
    validTo: 2024 - 11 - 13,
  },
  {
    id: 3,
    name: "Єлєва Аліса Дмитрівна",
    "Issuer CN": "privatbank",
    validFrom: 2023 - 11 - 13,
    validTo: 2024 - 11 - 13,
  },
  {
    id: 4,
    name: "Єлєва Аліса Дмитрівна",
    "Issuer CN": "privatbank",
    validFrom: 2023 - 11 - 13,
    validTo: 2024 - 11 - 13,
  }
];

export const HomePage = () => {
  const { certificateId } = useParams();
  const selectedTabsById = testArray.find(test => test.id.toString() === certificateId);

  return (
    <>
      {selectedTabsById === undefined ? <div /> : (<InfoCard />)}
    </>
  )
};