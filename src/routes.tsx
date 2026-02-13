import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Welcome } from "./components/Welcome";
import { Auth } from "./components/Auth";
import { ProfileSetup } from "./components/ProfileSetup";
import { Home } from "./components/Home";
import { Spaces } from "./components/Spaces";
import { CreateMenu } from "./components/CreateMenu";
import { Create } from "./components/Create";
import { Groups } from "./components/Groups";
import { Profile } from "./components/Profile";
import { SessionDetail } from "./components/SessionDetail";
import { StudySessionPage } from "./components/StudySessionPage";
import { FocusRoom } from "./components/FocusRoom";
import { AddAssignment } from "./components/AddAssignment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Welcome },
      { path: "auth", Component: Auth },
      { path: "setup", Component: ProfileSetup },
      { path: "home", Component: Home },
      { path: "spaces", Component: Spaces },
      { path: "create", Component: CreateMenu },
      { path: "create-session", Component: Create },
      { path: "groups", Component: Groups },
      { path: "profile", Component: Profile },
      { path: "session/:id", Component: SessionDetail },
      { path: "study-session", Component: StudySessionPage },
      { path: "focus-room", Component: FocusRoom },
      { path: "add-assignment", Component: AddAssignment },
    ],
  },
]);