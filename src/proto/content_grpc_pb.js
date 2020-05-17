// GENERATED CODE -- DO NOT EDIT!

'use strict';
var content_pb = require('./content_pb.js');

function serialize_ContentRequest(arg) {
  if (!(arg instanceof content_pb.ContentRequest)) {
    throw new Error('Expected argument of type ContentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ContentRequest(buffer_arg) {
  return content_pb.ContentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ContentResponse(arg) {
  if (!(arg instanceof content_pb.ContentResponse)) {
    throw new Error('Expected argument of type ContentResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ContentResponse(buffer_arg) {
  return content_pb.ContentResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ContentService = exports['Content'] = {
  getContent: {
    path: '/Content/GetContent',
    requestStream: false,
    responseStream: false,
    requestType: content_pb.ContentRequest,
    responseType: content_pb.ContentResponse,
    requestSerialize: serialize_ContentRequest,
    requestDeserialize: deserialize_ContentRequest,
    responseSerialize: serialize_ContentResponse,
    responseDeserialize: deserialize_ContentResponse,
  },
};

