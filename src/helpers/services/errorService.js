export default class ErrorService {
  static onError (error) {
    const response = error.response
    const message = error.message || ''

    if (response && response.status === 400) {
      ErrorService.displayErrorAlert('Bad Request.')
      return false
    } else if (response && response.status === 401) {
      ErrorService.displayErrorAlert('No valid API key provided.')
      return false
    } else if (response && response.status === 403) {
      ErrorService.displayErrorAlert('Don\'t have access to service. Maybe invalid api key.')
      return false
    } else if (response && response.status === 404) {
      ErrorService.displayErrorAlert('Resources not found')
      return false
    } else if (response && response.status === 429) {
      ErrorService.displayErrorAlert('Too many requests', message)
      return false
    } else if (response && response.status === 500) {
      ErrorService.displayErrorAlert('internal server error 500 ')
      return false
    } else if (message) {
      ErrorService.displayErrorAlert(message)
    }
  }

  static displayErrorAlert (message) {
    alert(message)
  }
}
