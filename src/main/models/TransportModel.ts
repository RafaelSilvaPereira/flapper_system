export class TransportModel {
 readonly id: string;
 readonly destinationCity: string;
 readonly originCity: string;

  constructor(builder: Required<TransportModel>) {
    Object.assign(this, builder);
  }


}
