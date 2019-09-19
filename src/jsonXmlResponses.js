const respond = (request, response, status, /* object, */content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  // response.write(JSON.stringify(object));
  response.write(content);
  response.end();
};

// const respondMeta = (request, response, status) => {
//   response.writeHead(status, { 'Content-Type': 'application/json' });
//   response.end();
// };

const success = (request, response, params, type) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }
  // otherwise keep json

  const content = JSON.stringify(responseJSON);

  return respond(request, response, 200, content, 'application/json');
};

const badRequest = (request, response, params, type) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameters set to true';
    responseJSON.id = 'badRequest';

    if (type[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 400, responseXML, 'text/xml');
    }

    const content = JSON.stringify(responseJSON);

    return respond(request, response, 400, content, 'application/json');
  }

  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
    // responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const content = JSON.stringify(responseJSON);
  return respond(request, response, 200, content, 'application/json');
};

const unauthorized = (request, response, params, type) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn parameters set to yes';
    responseJSON.id = 'unauthorized';
    const content = JSON.stringify(responseJSON);

    if (type[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 401, responseXML, 'text/xml');
    }

    return respond(request, response, 401, content, 'application/json');
  }

  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
    // responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const content = JSON.stringify(responseJSON);
  return respond(request, response, 200, content, 'application/json');
};

const forbidden = (request, response, params, type) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const content = JSON.stringify(responseJSON);
  return respond(request, response, 403, content, 'application/json');
};

const internal = (request, response, params, type) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };


  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const content = JSON.stringify(responseJSON);
  return respond(request, response, 500, content, 'application/json');
};

const notImplemented = (request, response, params, type) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }

  const content = JSON.stringify(responseJSON);
  return respond(request, response, 501, content, 'application/json');
};

const notFound = (request, response, params, type) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message> ${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id> ${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }


  const content = JSON.stringify(responseJSON);

  return respond(request, response, 404, content, 'application/json');
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
