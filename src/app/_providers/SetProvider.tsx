import { useState } from "react";

const SetProvider = () => {

    const [selectedSetId, setSelectedSetId] = useState<null | string>(null);
    const [set, setSet] = useState(null);


    return { setSelectedSetId }
}

export default SetProvider