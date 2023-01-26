import Dashboard from "../../Client/views/Dashboard/Dashboard";
import LinkInBio from "../../Client/views/LinkInBio/LinkInBio";
import { EditLinkInBio } from "../../Client/views/LinkInBio/views/Edit/Edit";
import Edit from "../../Client/views/Links/views/Edit/Edit";
import Profil from "../../Client/views/Profil/Profil";
import Redirection from "../../Client/views/Redirection/Redirection";
import Stats from "../../Client/views/Stats/Stats";
import Features from "../../Website/views/Features/Features";
import Home from "../../Website/views/Home/Home";
import Login from "../../Website/views/Login/Login";
import Page404 from "../../Website/views/Page404";
import Payment from "../../Website/views/Payment/Payment";
import Pricing from "../../Website/views/Pricing/Pricing";
import Terms from "../../Website/views/Terms/Terms";

export const router = [
    { path : '/*', element : <Page404 /> },
    { path : '/page404', element : <Page404 /> },
    { path : '/', element : <Home /> },
    { path : '/dashboard', element : <Dashboard /> },
    { path : '/edit/:LinkID', element : <Edit /> },
    { path : '/login', element : <Login /> },
    { path : '/pricing', element : <Pricing /> },
    { path : '/stats', element : <Stats /> },
    { path : '/stats/:LinkID', element : <Stats /> },
    { path : '/payment/:planID/:billingID', element : <Payment /> },
    { path : '/:LinkID', element : <Redirection /> , blank : true},
    { path : '/@:userName', element : <LinkInBio /> , blank : true},
    { path : '/edit/@:userName', element : <EditLinkInBio /> },
    { path : '/profil', element : <Profil /> },
    { path : '/features', element : <Features /> },
    { path : '/terms', element : <Terms /> },
]