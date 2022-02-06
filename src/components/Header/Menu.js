import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

export const Menu = (props) => {
    // const[isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Navbar color="info" dark expand="md">
                <Container>
                <NavbarBrand href="/">Ti Academy</NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <NavItem>
                            <NavLink href="/">
                                Home
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                </Container>
            </Navbar>
        </div>
    );
};
