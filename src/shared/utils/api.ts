interface IQPs {
  page: number;
  name?: string;
  status?: 'alive' | 'dead' | 'uknown';
  species?: string;
  type?: string;
  gender?: 'female' | 'male' | 'genderless' | 'unknown';
}

export const getChaptersEndPoint = (qps: IQPs) => {
  const response = 'https://rickandmortyapi.com/api/episode/?';
  const endPoint = generateEndPointByQPs(qps, response);
  return endPoint;
};

const buildQueryString = (field: string, arrayData: string[]) => {
  let dataString = '';
  if (arrayData) {
    dataString += `${field}=`;
    arrayData.forEach((field: string) => {
      dataString += `${field},`;
    });
    // Remove last character, it is gonna be a ','
    dataString = dataString.substring(0, dataString.length - 1);
    dataString += '&';
  }
  return dataString;
};

const getQP = (qpName: string, qp: any) => {
  if (qp !== null && qp !== undefined) {
    if (Array.isArray(qp)) {
      return buildQueryString(qpName, qp);
    } else if (Number.isInteger(qp) || typeof qp === 'string') {
      return `${qpName}=${qp}&`;
    }
  } else {
    return '';
  }
};

const generateEndPointByQPs = (
  queryParameters: IQPs,
  endPoint: string,
): string => {
  let response = endPoint;
  for (const [key, value] of Object.entries(queryParameters)) {
    response += getQP(key, value);
  }
  // Remove last character, it is gonna be a '&'
  response = response.substring(0, response.length - 1);
  return response;
};
