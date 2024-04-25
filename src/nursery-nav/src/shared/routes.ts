import React from "react"
import PathConstants from "./pathConstants"

const ListPage = React.lazy(() => import("../pages/ListPage"))
const InstitutionDetailsPage = React.lazy(() => import("../pages/InstitutionDetailsPage"))

const routes = [
    { path: PathConstants.HOME, element: ListPage },
    { path: PathConstants.INSTITUTION_DETAILS, element: InstitutionDetailsPage },
]

export default routes