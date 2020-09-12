import React from "react";
import Aux from "../../hoc/Auxiliar"
import classes from "./Layout.module.scss"

const layout = (props) =>(
    <Aux>
        <div>
            drawer, toolbar, blabla
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)

export default layout;