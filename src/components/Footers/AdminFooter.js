
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href="https://www.mashmari.in"
              rel="noopener noreferrer"
              target="_blank"
            >
              Mashmari
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">

            <NavItem>
              <NavLink
                href="https://www.mashmari.in/"
                rel="noopener noreferrer"
                target="_blank"
              >
                About Us
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://www.mashmari.in/contact/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Contact us
              </NavLink>
            </NavItem>

          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
