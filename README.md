# 🌿🕵️‍♂️ Branch name checker

This GitHub action is an automated workflow that you can set up in your repository to verify the nomenclature of branches in your projects. It can be useful to ensure that all branches created in your repository follow a specific naming standard, making it easier to organize and track work in your project.

## ⚙️ Configuration

You can configure this action using the following parameters:

- **branch_pattern**: The naming pattern that branches should follow. You must specify a regular expression that matches the names of the branches you want to allow. For example, `'feature|hotfix|chore'`.
  
- ignore_branch_pattern**: An optional pattern of branches to ignore during nomenclature checking. This is useful if there are certain branches that you do not need to check. For example, `'internal'`.
  
- **comment_for_invalid_branch_name**: The message that will be written as a comment in the pull request if the branch nomenclature is invalid. You can customize this message according to your needs.
  
- **fail_if_invalid_branch_name**: An optional value (`'true'` or `'false'`) indicating whether the action should fail if the branch nomenclature is invalid. If set to `'true'`, the action will fail and the pull request will be marked as failed in case of error.

## 📝 Example

Here is an example of how to configure this action in your repository:

```yaml
name: Nomenclatura de Ramas

on:
  pull_request:
    types: [opened, edited]

jobs:
  check-branch-naming:
    runs-on: ubuntu-latest
    steps:
      - name: Check out code
        uses: actions/checkout@v2

      - name: Run Branch Naming Check
        uses: ./path/to/your/action
        with:
          branch_pattern: 'feature|hotfix|chore'
          ignore_branch_pattern: 'internal'
          comment_for_invalid_branch_name: 'El nombre de esta rama no sigue el estándar de nomenclatura.'
          fail_if_invalid_branch_name: 'true'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

In this example, the action is executed on each open or edit of a pull request. It checks that the branch name starts with *"feature "*, *"hotfix "* or *"chore "* and ignores any branch starting with *"internal "*. If the check fails, a comment is written to the pull request and it is marked as failed if configured to do so.

## 👥 Contribution

If you wish to contribute to this action, feel free to do so! You can submit proposals for improvements, bug fixes or new features via pull requests.