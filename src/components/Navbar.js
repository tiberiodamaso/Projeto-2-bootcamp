import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>

      {/* NAVBAR */}
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
          <i className="bi bi-check2-square"></i>
          <span className="fs-4">TODO</span>
        </Link>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <Link className="me-3 py-2 text-dark text-decoration-none" to="/"><i className="bi bi-list-task"></i>Tarefas</Link>
          <Link className="me-3 py-2 text-dark text-decoration-none" to="/equipe"><i className="bi bi-person"></i>Equipe</Link>
        </nav>
      </div>

    </header>
  );
}

export default Navbar;