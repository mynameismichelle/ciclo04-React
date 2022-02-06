import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap"

export const Footer = () => {
    return (
        <footer className="position-fixed bottom-0 bg-info p-3 w-100">
            <Container className="m-auto" dark expand="md">
                <div className="d-flex">
                    <Breadcrumb className="m-auto">
                        <BreadcrumbItem active>
                            TI Academy Services!!
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            <a href="https://www.google.com/" className="text-decoration-none">
                                Facebook
                            </a>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            <a href="https://www.google.com/" className="text-decoration-none">
                                Instagran
                            </a>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </Container>

        </footer>
    );
};
