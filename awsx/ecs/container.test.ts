// Copyright 2016-2022, Pulumi Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { getMappingInputs } from "./containers";

describe("port mappings", () => {
  it.each`
    tgDefault    | containerIn  | hostIn       | containerOut | hostOut
    ${undefined} | ${undefined} | ${3}         | ${3}         | ${3}
    ${undefined} | ${2}         | ${undefined} | ${2}         | ${2}
    ${undefined} | ${2}         | ${3}         | ${2}         | ${3}
    ${1}         | ${undefined} | ${undefined} | ${1}         | ${1}
    ${1}         | ${undefined} | ${3}         | ${3}         | ${3}
    ${1}         | ${2}         | ${undefined} | ${2}         | ${1}
    ${1}         | ${2}         | ${3}         | ${2}         | ${3}
  `(
    "picks correct default for $tgDefault, $containerIn, $hostIn",
    ({ tgDefault, containerIn, hostIn, containerOut, hostOut }) => {
      const inputs = getMappingInputs({ containerPort: containerIn, hostPort: hostIn }, tgDefault);
      expect(inputs).toMatchObject({ containerPort: containerOut, hostPort: hostOut });
    },
  );
});
