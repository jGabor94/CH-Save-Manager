import { Box } from "@mui/material";
import { SWRProvider } from "../_providers/providers";
import { FC } from "react";
import { SaveGame } from "@/lib/database/models";
import { auth } from "@/lib/services/authentication/auth";
import List from "@/components/sections/List";
import Info from "@/components/sections/Info";
import Selector from "@/components/sections/Selector";
import { Mongoose_SaveGame_Serializable } from "@/lib/database/mongooseSchema";
import { toSerializableObject } from "@/lib/assets/assets";


const Home: FC<{}> = async () => {

  const session = await auth()

  if (session !== null) {

    const saveGames = await SaveGame.find({ userid: session.user._id }).sort({ _id: -1 })

    return (
      <SWRProvider value={{ fallback: { "saveGames": toSerializableObject<Mongoose_SaveGame_Serializable>(saveGames) } }}>
        <Box sx={{
          display: "grid",
          gridTemplateAreas: { xs: " 'a' 'b' 'c' 'd' ", md: " 'a b' 'c b' 'd d' " },
          gap: 2,
          width: 1100,
          maxWidth: "100%"
        }}>
          <Box gridArea="a">
            <Selector />
          </Box>
          <Box gridArea="b">
            <List />
          </Box>
          <Box gridArea="c">
            <Info />
          </Box>
        </Box>
      </SWRProvider >
    );
  }
}

export default Home
