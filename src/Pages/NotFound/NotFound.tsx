import { Link } from 'react-router-dom';
import './notFound.scss'

export const NotFound = () => {
  return (
    <main className="main">
      <Link to="/">
        Повернутись на головну
      </Link>
    </main>
  )
}