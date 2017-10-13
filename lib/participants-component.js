const etch = require('etch')
const $ = etch.dom

module.exports =
class ParticipantsComponent {
  constructor (props) {
    this.props = props
    etch.initialize(this)
  }

  update (props) {
    Object.assign(this.props, props)
    return etch.update(this)
  }

  render () {
    let participantComponents

    if (this.props.portalBinding) {
      const {portal} = this.props.portalBinding
      const activeSiteIds = portal.getActiveSiteIds().sort((a, b) => a - b)
      participantComponents = activeSiteIds.map((siteId) =>
        this.renderParticipant(siteId, portal.getSiteIdentity(siteId))
      )
    } else {
      const {localUserIdentity} = this.props
      participantComponents = [this.renderParticipant(1, localUserIdentity)]
    }

    return $.div({className: 'PortalParticipants'},
      participantComponents[0],
      $.div({className: 'PortalParticipants-guests'},
        participantComponents.slice(1),
        this.props.isInvitationButtonVisible ? this.renderParticipantInvitationButton() : null
      )
    )
  }

  renderParticipant (siteId, {login}) {
    const avatarSize = siteId === 1 ? 80 : 52
    return $.div(
      {className: `PortalParticipants-participant PortalParticipants-site-${siteId}`},
      $.img({src: `https://avatars.githubusercontent.com/${login}?s=${avatarSize}`})
    )
  }

  renderParticipantInvitationButton () {
    const selectedClass = this.props.isInvitationButtonToggled ? 'selected' : ''
    return $.div({className: 'PortalParticipants-guests-add btn-group'},
      $.label({
        className: `btn ${selectedClass}`,
        onClick: this.didClickInvitationButton
      })
    )
  }

  didClickInvitationButton () {
    if (this.props.onInvitationButtonClick) {
      this.props.onInvitationButtonClick()
    }
  }
}