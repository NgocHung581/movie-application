import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import tmdbConfigs from "../api/configs/tmdb.configs";
import personApi from "../api/modules/person.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import Title from "../components/common/Title";
import PersonMediaGrid from "../components/common/PersonMediaGrid";

function PersonDetail() {
    const { personId } = useParams();

    const [person, setPerson] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        const getPerson = async () => {
            dispatch(setGlobalLoading(true));

            const { res, error } = await personApi.detail({ personId });

            dispatch(setGlobalLoading(false));

            if (error) toast.error(error.message);
            if (res) setPerson(res);
        };

        getPerson();
    }, [personId, dispatch]);

    if (!person) return;

    return (
        <div className="container mx-auto mt-16 p-4">
            <div className="relative flex flex-col md:flex-row">
                <div className="w-1/2 md:w-1/5">
                    <div
                        style={{
                            "--image-url": `url(${tmdbConfigs.posterPath(
                                person.profile_path
                            )})`,
                        }}
                        className={`bg-center bg-cover bg-[image:var(--image-url)] pt-[160%]`}
                    ></div>
                </div>
                <div className="p-4 md:px-8 md:py-4 w-full md:w-4/5">
                    <h5 className="font-bold">
                        {`${person.name} (${person.birthday.split("-")[0]}`}
                        {person.deathday &&
                            ` - ${person.deathday.split("-")[0]}`}
                        {")"}
                    </h5>
                    <p className="line-clamp-[10] text-justify tracking-wide mt-4">
                        {person.biography}
                    </p>
                </div>
            </div>

            <div className="mt-20">
                <Title title="Medias" />
                <PersonMediaGrid personId={personId} />
            </div>
        </div>
    );
}

export default PersonDetail;
