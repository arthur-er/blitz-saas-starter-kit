import { render } from "test/utils"
import uuid from "uuid"

import Home from "./index"
import { useCurrentUser } from "app/modules/users/hooks/useCurrentUser"

jest.mock("uuid", () => ({
  v4: () => "some-short-v4-uuid-0",
}))
jest.mock("app/modules/users/hooks/useCurrentUser")
const mockUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>

test("renders blitz documentation link", () => {
  // This is an example of how to ensure a specific item is in the document
  // But it's disabled by default (by test.skip) so the test doesn't fail
  // when you remove the the default content from the page

  // This is an example on how to mock api hooks when testing
  mockUseCurrentUser.mockReturnValue({
    id: uuid.v4(),
    name: "User",
    email: "user@email.com",
    role: "user",
  })

  const { getByText } = render(<Home />)
  const linkElement = getByText(/Documentation/i)
  expect(linkElement).toBeInTheDocument()
})
