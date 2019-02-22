workflow "Increment Pixela if Pull Request is opened" {
  on = "pull_request"
  resolves = [
    "increment pixe.la",
  ]
}

action "Filter PR is opened" {
  uses = "actions/bin/filter@46ffca7632504e61db2d4cb16be1e80f333cb859"
  args = "action 'opened|reopened'"
}

action "increment pixe.la" {
  uses = "swinton/httpie.action@8ab0a0e926d091e0444fcacd5eb679d2e2d4ab3d"
  needs = ["Filter PR is opened"]
  args = ["POST", "pixe.la/v1/users/$PIXELA_USERNAME/webhooks/$PIXELA_PR_INCREMENT_HASH"]
  secrets = ["PIXELA_PR_INCREMENT_HASH", "PIXELA_USERNAME"]
}

action "Filter PR is closed" {
  uses = "actions/bin/filter@46ffca7632504e61db2d4cb16be1e80f333cb859"
  args = "action 'closed'"
}

action "decrement pixe.la" {
  uses = "swinton/httpie.action@8ab0a0e926d091e0444fcacd5eb679d2e2d4ab3d"
  needs = ["Filter PR is closed"]
  args = ["POST", "pixe.la/v1/users/$PIXELA_USERNAME/webhooks/$PIXELA_PR_DECREMENT_HASH"]
  secrets = ["PIXELA_PR_DECREMENT_HASH", "PIXELA_USERNAME"]
}

workflow "Decrement Pixela if Pull Request is closed" {
  on = "pull_request"
  resolves = [
    "decrement pixe.la",
  ]
}
