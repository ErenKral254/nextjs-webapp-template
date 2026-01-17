module.exports = {
  branches: ['main'],
  tagFormat: 'v${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'sed -i "s/tag:.*/tag: ${nextRelease.version}/" chart/{{APP_NAME}}/base/values.yaml && sed -i "s/tag: \\"[0-9.]*\\"/tag: \\"${nextRelease.version}\\"/" flux/prod/helmrelease.yaml',
        publishCmd: './scripts/publish-release.sh ${nextRelease.version}',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [
          'CHANGELOG.md',
          'package.json',
          'package-lock.json',
          'chart/{{APP_NAME}}/base/values.yaml',
          'flux/prod/helmrelease.yaml',
        ],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'CHANGELOG.md',
            label: 'Changelog',
          },
        ],
      },
    ],
  ],
};