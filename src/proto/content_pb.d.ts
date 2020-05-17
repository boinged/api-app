// package: 
// file: content.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ContentRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ContentRequest): ContentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContentRequest;
    static deserializeBinaryFromReader(message: ContentRequest, reader: jspb.BinaryReader): ContentRequest;
}

export namespace ContentRequest {
    export type AsObject = {
    }
}

export class ContentResponse extends jspb.Message { 
    getContent(): string;
    setContent(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContentResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ContentResponse): ContentResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContentResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContentResponse;
    static deserializeBinaryFromReader(message: ContentResponse, reader: jspb.BinaryReader): ContentResponse;
}

export namespace ContentResponse {
    export type AsObject = {
        content: string,
    }
}
